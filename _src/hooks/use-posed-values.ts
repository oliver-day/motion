import { MotionValue } from "../motion-value"
import { resolvePoses } from "../utils/pose-resolvers"
import { PoseConfig, MotionProps, MotionValueMap } from "../motion/types"
import { useRef, useEffect, RefObject } from "react"
import { createValuesFromPose, bindValuesToRef } from "../utils/create-value"

const isMotionValue = (value: any): value is MotionValue => value instanceof MotionValue

export const usePosedValues = (
    config: PoseConfig,
    { onAnimationComplete, pose = "default", motionValues, ...props }: MotionProps,
    ref: RefObject<Element>
): [MotionValueMap, Partial<MotionProps>] => {
    const values: MotionValueMap = useRef(new Map<string, MotionValue>()).current

    // In this function we want to find the right approach to ensure
    // we successfully remove MotionValues from the returned props
    // in a performant way over subsequent renders.

    // 1. Add provided motion values via props to value map
    if (motionValues) {
        Object.keys(motionValues).forEach(key => {
            const motionValue = motionValues[key]

            if (isMotionValue(motionValue)) {
                values.set(key, motionValue)
            }
        })
    }

    // 2. Create values from poses
    const initialPoses = resolvePoses(pose)
    initialPoses.reverse().forEach(poseKey => {
        const poseDef = config[poseKey]
        if (!poseDef) return

        const currentPose = typeof poseDef === "function" ? poseDef(props, {}, {}) : poseDef

        createValuesFromPose(values, currentPose)
    })

    // 3. Bind stylers when ref is ready
    useEffect(() => {
        bindValuesToRef(values, ref)
        return () => values.forEach(value => value.destroy())
    }, [])

    return [values, props]
}