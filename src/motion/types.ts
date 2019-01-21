import { Ref, CSSProperties } from "react"
import { MotionValue } from "../value"
import { AnimationManager } from "../animation"
import { Poses, PoseDefinition, PoseTransition } from "../types"
import { GestureHandlers } from "../gestures"
import { DraggableProps } from "../behaviours"

export type MotionStyleProp = string | number | MotionValue

export type PoseKeys = string | string[]

export interface MotionStyleProperties {
    x?: MotionStyleProp
    y?: MotionStyleProp
    z?: MotionStyleProp
    rotate?: MotionStyleProp
    rotateX?: MotionStyleProp
    rotateY?: MotionStyleProp
    rotateZ?: MotionStyleProp
    scale?: MotionStyleProp
    scaleX?: MotionStyleProp
    scaleY?: MotionStyleProp
    scaleZ?: MotionStyleProp
    skew?: MotionStyleProp
    skewX?: MotionStyleProp
    skewY?: MotionStyleProp
    originX?: MotionStyleProp
    originY?: MotionStyleProp
    originZ?: MotionStyleProp
    perspective?: MotionStyleProp
}

export type MakeMotion<T> = { [K in keyof T]: T[K] | MotionValue<T[K]> }

export type MotionStyle = MakeMotion<CSSProperties> & MotionStyleProperties

export interface MotionProps extends GestureHandlers, DraggableProps {
    ref?: Ref<Element>
    style?: MotionStyle
    animate?: AnimationManager | PoseDefinition | PoseKeys
    poses?: Poses
    initialPose?: PoseKeys
    transition?: PoseTransition
    inherit?: boolean
    onAnimationComplete?: () => void
}
