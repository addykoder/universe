'use client';
import { motion } from 'framer-motion';

export default function Loader({onLoad, onStart}:{onLoad:()=>void, onStart:()=>void}) {
	return (
		<motion.div
			className='loader fixed inset-0 z-[1000] bg-[var(--bg)] h-full w-full flex flex-col justify-center items-center'
			animate={{
				opacity: [1, 1, 0, 0],
				translateY: [0, 0, 0, '-200%'],
			}}
			transition={{
				duration: 2.75,
				ease: 'easeInOut',
				times: [0, 0.9, 0.999, 1],
			}}
			onAnimationComplete={onLoad}
			onAnimationStart={onStart}
		>
			<motion.div
				animate={{
					opacity: [0, 1],
				}}
				transition={{
					duration: 1,
					ease: 'easeInOut',
					times:[0,1]
				}}
				className={ `bg-[url('/icon.png')] bg-center bg-[var(--bg)] bg-contain bg-no-repeat logo w-[50%] h-[50%]` }
			/>
		</motion.div>
	);
}
