export const animateHeader = (gsap, tl) => {
  tl.fromTo(
		'.form-anim',
		{
			x: '-100vw',
			// right: '100vw',
			// y: '-50%',
		},
		{
			// right: '-10%',
			x: '0%',
			duration: 2,
			onUpdate: (self) => {
				// changeTitle()
			},
		},
		'<'
	)
}