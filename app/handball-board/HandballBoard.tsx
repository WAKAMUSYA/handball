'use client'

import type { PointerEvent as ReactPointerEvent } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import styles from './handball-board.module.css'

type Side = 'home' | 'away'

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

const VIEWBOX = { width: 200, height: 120 }

const PLAYER_RADIUS = 7.5
const BALL_RADIUS = 5.5

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function clampToCourt(point: { x: number; y: number }, radius: number) {
  return {
    x: clamp(point.x, radius, VIEWBOX.width - radius),
    y: clamp(point.y, radius, VIEWBOX.height - radius),
  }
}

function getSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const point = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse())
  return { x: point.x, y: point.y }
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

function PieceCircle({
  piece,
  isDragging,
  onPointerDown,
}: {
  piece: Piece
  isDragging: boolean
  onPointerDown: (e: ReactPointerEvent<SVGGElement>, id: string) => void
}) {
  const radius = piece.kind === 'ball' ? BALL_RADIUS : PLAYER_RADIUS
  const fill =
    piece.kind === 'ball'
      ? '#F6D32D'
      : piece.side === 'home'
        ? '#2F6FED'
        : '#E5484D'

  return (
    <g
      className={styles.piece}
      data-dragging={isDragging ? 'true' : 'false'}
      onPointerDown={(e) => onPointerDown(e, piece.id)}
      role="button"
      aria-label={piece.kind === 'ball' ? 'ball' : `${piece.side}-${piece.number}`}
    >
      <circle cx={piece.x} cy={piece.y} r={radius} fill={fill} />
      {piece.kind === 'player' ? (
        <text
          x={piece.x}
          y={piece.y + 0.8}
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

function CourtLines() {
  const goalCenterY = VIEWBOX.height / 2
  const goalAreaR = 30 // 6m相当（見た目用スケール）
  const freeThrowR = 45 // 9m相当（見た目用スケール）

  const goalAreaArc = `M 0 ${goalCenterY - goalAreaR} A ${goalAreaR} ${goalAreaR} 0 0 1 0 ${goalCenterY + goalAreaR}`
  const freeThrowArc = `M 0 ${goalCenterY - freeThrowR} A ${freeThrowR} ${freeThrowR} 0 0 1 0 ${goalCenterY + freeThrowR}`

  return (
    <g className={styles.courtLines}>
      <rect x={0} y={0} width={VIEWBOX.width} height={VIEWBOX.height} className={styles.courtBorder} />
      <line
        x1={VIEWBOX.width}
        y1={0}
        x2={VIEWBOX.width}
        y2={VIEWBOX.height}
        className={styles.centerLine}
      />

      <rect x={0} y={goalCenterY - 5} width={2} height={10} className={styles.goal} />

      <path d={goalAreaArc} className={styles.goalAreaLine} />
      <path d={freeThrowArc} className={styles.freeThrowLine} />

      <line
        x1={VIEWBOX.width - 18}
        y1={0}
        x2={VIEWBOX.width - 18}
        y2={VIEWBOX.height}
        className={styles.subLine}
      />
    </g>
  )
}

export default function HandballBoard() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const initialPieces = useMemo(() => createInitialPieces(), [])
  const [pieces, setPieces] = useState<Piece[]>(initialPieces)
  const [drag, setDrag] = useState<DragState>(null)

  const piecesById = useMemo(() => {
    const map = new Map<string, Piece>()
    for (const piece of pieces) map.set(piece.id, piece)
    return map
  }, [pieces])

  const onReset = useCallback(() => {
    setPieces(initialPieces)
    setDrag(null)
  }, [initialPieces])

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<SVGGElement>, id: string) => {
      const svg = svgRef.current
      if (!svg) return
      const piece = piecesById.get(id)
      if (!piece) return

      e.preventDefault()
      e.stopPropagation()

      ;(e.currentTarget as SVGGElement).setPointerCapture(e.pointerId)

      const p = getSvgPoint(svg, e.clientX, e.clientY)
      setDrag({
        id,
        pointerId: e.pointerId,
        offsetX: p.x - piece.x,
        offsetY: p.y - piece.y,
      })
    },
    [piecesById],
  )

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      if (!drag) return
      if (e.pointerId !== drag.pointerId) return
      const svg = svgRef.current
      if (!svg) return

      e.preventDefault()

      const p = getSvgPoint(svg, e.clientX, e.clientY)

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
    [drag],
  )

  const endDrag = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      if (!drag) return
      if (e.pointerId !== drag.pointerId) return
      e.preventDefault()
      setDrag(null)
    },
    [drag],
  )

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>Handball Board</h1>
        <button type="button" className={styles.resetButton} onClick={onReset}>
          配置リセット
        </button>
      </header>

      <div className={styles.boardCard}>
        <svg
          ref={svgRef}
          className={styles.svg}
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <rect
            x={0}
            y={0}
            width={VIEWBOX.width}
            height={VIEWBOX.height}
            className={styles.courtBackground}
          />
          <CourtLines />
          <g className={styles.piecesLayer}>
            {pieces.map((piece) => (
              <PieceCircle
                key={piece.id}
                piece={piece}
                isDragging={drag?.id === piece.id}
                onPointerDown={onPointerDown}
              />
            ))}
          </g>
        </svg>
      </div>

      <p className={styles.hint}>
        青: 味方(1〜6) / 赤: 敵(1〜6) / 黄: ボール。ドラッグで移動できます（PC/スマホ対応）。
      </p>
    </div>
  )
}
