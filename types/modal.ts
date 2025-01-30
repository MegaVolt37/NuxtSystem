export interface UseVModalProps {
	id: string
	icon?: string
	title?: string
	subtitle?: string
	confirmText?: string
	escapeText?: string
	controls?: boolean
	multiple?: boolean
	componentProps?: any
	component?: string | Component
}