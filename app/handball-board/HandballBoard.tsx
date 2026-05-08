'use client'

import type { PointerEvent as ReactPointerEvent } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import styles from './handball-board.module.css'

type Side = 'home' | 'away'
type Orientation = 'landscape' | 'portrait'

type PlayerPiece = {
  id: string
  kind: 'player'
  side: Side
  number: number
  x: number
  y: number
}

type BallPiece = {
  id: string
  kind: 'ball'
  x: number
  y: number
}

type Piece = PlayerPiece | BallPiece

type DragState =
  | {
    id: string
    pointerId: number
    offsetX: number
    offsetY: number
  }
  | null

const LANDSCAPE = { width: 200, height: 120 }
const PORTRAIT = { width: 120, height: 200 }

const PLAYER_RADIUS = 7.5
const BALL_RADIUS = 5.5

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function clampToCourt(point: { x: number; y: number }, radius: number) {
  return {
    x: clamp(point.x, radius, LANDSCAPE.width - radius),
    y: clamp(point.y, radius, LANDSCAPE.height - radius),
  }
}

function getSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const point = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse())
  return { x: point.x, y: point.y }
}

function portraitToLandscape(p: { x: number; y: number }) {
  // forward: (xp, yp) = (y, PORTRAIT.height - x)
  // inverse:
  // y = xp
  // x = PORTRAIT.height - yp
  return { x: PORTRAIT.height - p.y, y: p.x }
}

function landscapeToPortrait(p: { x: number; y: number }) {
  return { x: p.y, y: PORTRAIT.height - p.x }
}

function toLandscapePoint(orientation: Orientation, p: { x: number; y: number }) {
  return orientation === 'portrait' ? portraitToLandscape(p) : p
}

function toSvgPoint(orientation: Orientation, p: { x: number; y: number }) {
  return orientation === 'portrait' ? landscapeToPortrait(p) : p
}

function createInitialPieces(): Piece[] {
  const home: PlayerPiece[] = Array.from({ length: 6 }, (_, index) => ({
    id: `home-${index + 1}`,
    kind: 'player',
    side: 'home',
    number: index + 1,
    x: 70,
    y: 25 + index * 14,
  }))

  const away: PlayerPiece[] = Array.from({ length: 6 }, (_, index) => ({
    id: `away-${index + 1}`,
    kind: 'player',
    side: 'away',
    number: index + 1,
    x: 120,
    y: 25 + index * 14,
  }))

  const ball: BallPiece = { id: 'ball', kind: 'ball', x: 95, y: 60 }

  return [...home, ...away, ball]
}

function createBenchPieces(): PlayerPiece[] {
  return [
    { id: 'home-7', kind: 'player', side: 'home', number: 7, x: 20, y: 10 },
    { id: 'away-7', kind: 'player', side: 'away', number: 7, x: 20, y: 25 },
  ]
}

function PieceCircle({
  piece,
  isDragging,
  onPointerDown,
  orientation,
}: {
  piece: Piece
  isDragging: boolean
  onPointerDown: (e: ReactPointerEvent<SVGGElement>, id: string) => void
  orientation: Orientation
}) {
  const radius = piece.kind === 'ball' ? BALL_RADIUS : PLAYER_RADIUS
  const fill =
    piece.kind === 'ball'
      ? '#F6D32D'
      : piece.side === 'home'
        ? '#2F6FED'
        : '#E5484D'

  const svgPoint = toSvgPoint(orientation, { x: piece.x, y: piece.y })

  return (
    <g
      className={styles.piece}
      data-dragging={isDragging ? 'true' : 'false'}
      onPointerDown={(e) => onPointerDown(e, piece.id)}
      role="button"
      aria-label={piece.kind === 'ball' ? 'ball' : `${piece.side}-${piece.number}`}
    >
      <circle cx={svgPoint.x} cy={svgPoint.y} r={radius} fill={fill} />
      {piece.kind === 'player' ? (
        <text
          x={svgPoint.x}
          y={svgPoint.y + 0.8}
          textAnchor="middle"
          dominantBaseline="middle"
          className={styles.playerNumber}
        >
          {piece.number}
        </text>
      ) : null}
    </g>
  )
}

function CourtLines({ orientation }: { orientation: Orientation }) {
  const dims = orientation === 'portrait' ? PORTRAIT : LANDSCAPE
  const goalCenterY = dims.height / 2
  const goalAreaR = 30 // 6m相当（見た目用スケール）
  const freeThrowR = 45 // 9m相当（見た目用スケール）

  const goalAreaArc = `M 0 ${goalCenterY - goalAreaR} A ${goalAreaR} ${goalAreaR} 0 0 1 0 ${goalCenterY + goalAreaR}`
  const freeThrowArc = `M 0 ${goalCenterY - freeThrowR} A ${freeThrowR} ${freeThrowR} 0 0 1 0 ${goalCenterY + freeThrowR}`

  return (
    <g className={styles.courtLines}>
      <rect x={0} y={0} width={dims.width} height={dims.height} className={styles.courtBorder} />
      <line
        x1={dims.width}
        y1={0}
        x2={dims.width}
        y2={dims.height}
        className={styles.centerLine}
      />

      <rect x={0} y={goalCenterY - 5} width={2} height={10} className={styles.goal} />

      <path d={goalAreaArc} className={styles.goalAreaLine} />
      <path d={freeThrowArc} className={styles.freeThrowLine} />

      <line
        x1={dims.width - 18}
        y1={0}
        x2={dims.width - 18}
        y2={dims.height}
        className={styles.subLine}
      />
    </g>
  )
}

export default function HandballBoard() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const initialPieces = useMemo(() => createInitialPieces(), [])
  const benchPieces = useMemo(() => createBenchPieces(), [])
  const [pieces, setPieces] = useState<Piece[]>(initialPieces)
  const [drag, setDrag] = useState<DragState>(null)
  const [orientation, setOrientation] = useState<Orientation>('landscape')
  const [enable7th, setEnable7th] = useState(false)

  const piecesById = useMemo(() => {
    const map = new Map<string, Piece>()
    for (const piece of pieces) map.set(piece.id, piece)
    return map
  }, [pieces])

  const onReset = useCallback(() => {
    setPieces(enable7th ? [...initialPieces, ...benchPieces] : initialPieces)
    setDrag(null)
  }, [benchPieces, enable7th, initialPieces])

  const onToggle7th = useCallback(
    (nextEnabled: boolean) => {
      setEnable7th(nextEnabled)
      setPieces((current) => {
        if (nextEnabled) {
          const existing = new Set(current.map((p) => p.id))
          const toAdd = benchPieces.filter((p) => !existing.has(p.id))
          return [...current, ...toAdd]
        }
        return current.filter((p) => p.id !== 'home-7' && p.id !== 'away-7')
      })
      setDrag((currentDrag) => {
        if (!currentDrag) return null
        if (nextEnabled) return currentDrag
        return currentDrag.id === 'home-7' || currentDrag.id === 'away-7' ? null : currentDrag
      })
    },
    [benchPieces],
  )

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<SVGGElement>, id: string) => {
      const svg = svgRef.current
      if (!svg) return
      const piece = piecesById.get(id)
      if (!piece) return

      e.preventDefault()
      e.stopPropagation()

        ; (e.currentTarget as SVGGElement).setPointerCapture(e.pointerId)

      const pSvg = getSvgPoint(svg, e.clientX, e.clientY)
      const p = toLandscapePoint(orientation, pSvg)
      setDrag({
        id,
        pointerId: e.pointerId,
        offsetX: p.x - piece.x,
        offsetY: p.y - piece.y,
      })
    },
    [piecesById, orientation],
  )

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      if (!drag) return
      if (e.pointerId !== drag.pointerId) return
      const svg = svgRef.current
      if (!svg) return

      e.preventDefault()

      const pSvg = getSvgPoint(svg, e.clientX, e.clientY)
      const p = toLandscapePoint(orientation, pSvg)

      setPieces((current) => {
        const next = current.map((piece) => {
          if (piece.id !== drag.id) return piece
          const radius = piece.kind === 'ball' ? BALL_RADIUS : PLAYER_RADIUS
          const clamped = clampToCourt(
            { x: p.x - drag.offsetX, y: p.y - drag.offsetY },
            radius,
          )
          return { ...piece, x: clamped.x, y: clamped.y }
        })
        return next
      })
    },
    [drag, orientation],
  )

  const endDrag = useCallback((e: ReactPointerEvent<SVGSVGElement>) => {
    if (!drag) return
    if (e.pointerId !== drag.pointerId) return
    e.preventDefault()
    setDrag(null)
  }, [drag])

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>Handball Board</h1>
        <div className={styles.controls}>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={enable7th}
              onChange={(e) => onToggle7th(e.target.checked)}
            />
            7人目
          </label>
          <div className={styles.segment}>
            <button
              type="button"
              className={styles.segmentButton}
              data-active={orientation === 'portrait' ? 'true' : 'false'}
              onClick={() => setOrientation('portrait')}
            >
              縦長
            </button>
            <button
              type="button"
              className={styles.segmentButton}
              data-active={orientation === 'landscape' ? 'true' : 'false'}
              onClick={() => setOrientation('landscape')}
            >
              横長
            </button>
          </div>
          <button type="button" className={styles.resetButton} onClick={onReset}>
            配置リセット
          </button>
        </div>
      </header>

      <div className={styles.boardCard}>
        <svg
          ref={svgRef}
          className={styles.svg}
          data-orientation={orientation}
          viewBox={`0 0 ${orientation === 'portrait' ? PORTRAIT.width : LANDSCAPE.width} ${orientation === 'portrait' ? PORTRAIT.height : LANDSCAPE.height}`}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <rect
            x={0}
            y={0}
            width={orientation === 'portrait' ? PORTRAIT.width : LANDSCAPE.width}
            height={orientation === 'portrait' ? PORTRAIT.height : LANDSCAPE.height}
            className={styles.courtBackground}
          />
          {orientation === 'portrait' ? (
            <g transform={`translate(0 ${PORTRAIT.height}) rotate(-90)`}>
              <CourtLines orientation="landscape" />
            </g>
          ) : (
            <CourtLines orientation={orientation} />
          )}
          <g className={styles.piecesLayer}>
            {pieces.map((piece) => (
              <PieceCircle
                key={piece.id}
                piece={piece}
                isDragging={drag?.id === piece.id}
                onPointerDown={onPointerDown}
                orientation={orientation}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
