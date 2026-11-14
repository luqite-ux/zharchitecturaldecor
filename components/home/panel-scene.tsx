'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { insulationCores, panelFinishes, type CoreId, type FinishId } from '@/lib/content/panels'

export type PanelView = 'angle' | 'section' | 'front'

export interface PanelSceneProps {
  finishId: FinishId
  coreId: CoreId
  explode: number
  view: PanelView
  reducedMotion: boolean
  coarsePointer: boolean
  onUnavailable: () => void
  onReady: () => void
}

const PANEL = { w: 3.2, h: 2.0 }
const THICKNESS = { finish: 0.14, board: 0.22, core: 0.6 }
const VIEW_PRESETS: Record<PanelView, { yaw: number; pitch: number }> = {
  angle: { yaw: -0.62, pitch: 0.2 },
  section: { yaw: -1.2, pitch: 0.1 },
  front: { yaw: 0, pitch: 0 },
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeFinishTexture(finishId: FinishId) {
  const finish = panelFinishes.find((f) => f.id === finishId)!
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = finish.swatch.base
  ctx.fillRect(0, 0, size, size)
  const rand = mulberry32(finishId.length * 977 + finishId.charCodeAt(0))
  const count = finishId === 'water-in-sand-finish' ? 5200 : 3200
  const maxR = finishId === 'water-in-sand-finish' ? 2.2 : 3.6
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = finish.swatch.flecks[Math.floor(rand() * finish.swatch.flecks.length)]
    ctx.globalAlpha = 0.45 + rand() * 0.5
    const r = 0.8 + rand() * maxR
    ctx.fillRect(rand() * size, rand() * size, r, r * (0.7 + rand() * 0.8))
  }
  ctx.globalAlpha = 1
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.anisotropy = 4
  return texture
}

function makeGrainTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#f2f2f2'
  ctx.fillRect(0, 0, size, size)
  const rand = mulberry32(42)
  for (let i = 0; i < 900; i++) {
    const v = 200 + Math.floor(rand() * 55)
    ctx.fillStyle = `rgb(${v},${v},${v})`
    ctx.fillRect(rand() * size, rand() * size, 2, 2)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return texture
}

export default function PanelScene(props: PanelSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const propsRef = useRef(props)
  propsRef.current = props

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      })
    } catch {
      propsRef.current.onUnavailable()
      return
    }

    const coarse = propsRef.current.coarsePointer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    const canvas = renderer.domElement
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    canvas.style.touchAction = 'pan-y'
    container.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
    camera.position.set(0, 0.2, 11)
    camera.lookAt(0, 0, 0)

    scene.add(new THREE.HemisphereLight(0xffffff, 0xd9cdb6, 1.35))
    const key = new THREE.DirectionalLight(0xfff0dc, 2.4)
    key.position.set(4, 6, 6)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xdbe6f5, 0.9)
    rim.position.set(-5, 2, -4)
    scene.add(rim)

    const grain = makeGrainTexture()
    const group = new THREE.Group()
    scene.add(group)

    const makeLayer = (depth: number, material: THREE.Material) => {
      const geometry = new THREE.BoxGeometry(PANEL.w, PANEL.h, depth)
      const mesh = new THREE.Mesh(geometry, material)
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({ color: 0x1c2536, transparent: true, opacity: 0.4 }),
      )
      mesh.add(edges)
      group.add(mesh)
      return { mesh, edges, geometry }
    }

    const finishMaterial = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0 })
    const boardMaterial = new THREE.MeshStandardMaterial({
      color: 0xe4e0d6,
      roughness: 0.95,
      map: grain,
    })
    const coreMaterial = new THREE.MeshStandardMaterial({ roughness: 0.9, map: grain })

    const finishLayer = makeLayer(THICKNESS.finish, finishMaterial)
    const boardLayer = makeLayer(THICKNESS.board, boardMaterial)
    const coreLayer = makeLayer(THICKNESS.core, coreMaterial)

    let appliedFinish: FinishId | null = null
    let appliedCore: CoreId | null = null

    const state = {
      yaw: propsRef.current.reducedMotion ? VIEW_PRESETS[propsRef.current.view].yaw : -0.2,
      pitch: VIEW_PRESETS[propsRef.current.view].pitch,
      explode: propsRef.current.reducedMotion ? propsRef.current.explode : 0,
      dragYaw: 0,
      dragPitch: 0,
      dragging: false,
    }
    let dirty = true
    let visible = true
    let docVisible = !document.hidden
    let frame = 0
    let last = performance.now()
    let announcedReady = false

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.position.z = w / h < 1 ? 14.5 : 11
      camera.updateProjectionMatrix()
      dirty = true
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) schedule()
    })
    io.observe(container)

    const onVisibility = () => {
      docVisible = !document.hidden
      if (docVisible) schedule()
    }
    document.addEventListener('visibilitychange', onVisibility)

    let pointerId: number | null = null
    let startX = 0
    let startY = 0
    let startYaw = 0
    let startPitch = 0
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      pointerId = e.pointerId
      canvas.setPointerCapture(e.pointerId)
      startX = e.clientX
      startY = e.clientY
      startYaw = state.dragYaw
      startPitch = state.dragPitch
      state.dragging = true
      canvas.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      state.dragYaw = THREE.MathUtils.clamp(startYaw + (e.clientX - startX) * 0.006, -0.9, 0.9)
      state.dragPitch = THREE.MathUtils.clamp(startPitch + (e.clientY - startY) * 0.004, -0.3, 0.4)
      dirty = true
      schedule()
    }
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      pointerId = null
      state.dragging = false
      canvas.style.cursor = 'grab'
    }
    if (!coarse) {
      canvas.style.cursor = 'grab'
      canvas.addEventListener('pointerdown', onDown)
      canvas.addEventListener('pointermove', onMove)
      canvas.addEventListener('pointerup', onUp)
      canvas.addEventListener('pointercancel', onUp)
    }

    function applySelections() {
      const p = propsRef.current
      if (appliedFinish !== p.finishId) {
        finishMaterial.map?.dispose()
        finishMaterial.map = makeFinishTexture(p.finishId)
        finishMaterial.needsUpdate = true
        appliedFinish = p.finishId
        dirty = true
      }
      if (appliedCore !== p.coreId) {
        const core = insulationCores.find((c) => c.id === p.coreId)!
        coreMaterial.color.set(core.color)
        appliedCore = p.coreId
        dirty = true
      }
    }

    function tick(now: number) {
      frame = 0
      if (!visible || !docVisible) return
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const p = propsRef.current
      applySelections()

      const preset = VIEW_PRESETS[p.view]
      const ease = p.reducedMotion ? 1 : Math.min(1, dt * 5)
      const sway = p.reducedMotion || coarse || state.dragging ? 0 : Math.sin(now / 2400) * 0.05
      const targetYaw = preset.yaw + state.dragYaw + sway
      const targetPitch = preset.pitch + state.dragPitch

      const dYaw = targetYaw - state.yaw
      const dPitch = targetPitch - state.pitch
      const dExplode = p.explode - state.explode
      state.yaw += dYaw * ease
      state.pitch += dPitch * ease
      state.explode += dExplode * (p.reducedMotion ? 1 : Math.min(1, dt * 3.2))

      if (Math.abs(dYaw) > 0.0005 || Math.abs(dPitch) > 0.0005 || Math.abs(dExplode) > 0.0005 || sway !== 0) {
        dirty = true
      }

      if (dirty) {
        const gap = state.explode * 0.85
        const coreZ = 0
        const boardZ = THICKNESS.core / 2 + THICKNESS.board / 2 + gap
        const finishZ = THICKNESS.core / 2 + THICKNESS.board + THICKNESS.finish / 2 + gap * 2
        const center = (finishZ + THICKNESS.finish / 2 - THICKNESS.core / 2) / 2
        coreLayer.mesh.position.z = coreZ - center
        boardLayer.mesh.position.z = boardZ - center
        finishLayer.mesh.position.z = finishZ - center
        group.rotation.y = state.yaw
        group.rotation.x = state.pitch
        renderer.render(scene, camera)
        dirty = false
        if (!announcedReady) {
          announcedReady = true
          propsRef.current.onReady()
        }
      }
      schedule()
    }

    function schedule() {
      if (!frame && visible && docVisible) frame = requestAnimationFrame(tick)
    }
    schedule()

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      for (const layer of [finishLayer, boardLayer, coreLayer]) {
        layer.geometry.dispose()
        layer.edges.geometry.dispose()
        ;(layer.edges.material as THREE.Material).dispose()
      }
      finishMaterial.map?.dispose()
      finishMaterial.dispose()
      boardMaterial.dispose()
      coreMaterial.dispose()
      grain.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      canvas.remove()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}
