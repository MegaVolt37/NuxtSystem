import {
	useModal as _useModal,
	useVfm as _useVfm,
	type UseModalOptions
} from 'vue-final-modal'
import uiModal from '~/components/ui/modal.vue'
import { type UseVModalProps } from '~/types/modal'

type VFMOptions = UseModalOptions<UseVModalProps>


interface ModalCreateOptions {
	multiple?: boolean
}

export const useVModal = (
	options: VFMOptions,
	createOptions: ModalCreateOptions = {}
) => {
	const { multiple } = createOptions

	const { closeAll } = _useVfm()
	const open = async (param = {}) => {
		const { attrs = {} } = options
		const { componentProps = {} } = attrs
		attrs.componentProps = { ...componentProps, ...param }
		if (!multiple) await closeAll()

		_open()
	}
	const { component, ...opts } = options
	const modalOptions = {
		...opts,
		component: options.component ?? uiModal
	}

	const { open: _open, close } = _useModal(modalOptions)

	return { open, close, closeAll }
}