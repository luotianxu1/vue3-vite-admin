import "./dropdownItem.scss"

export const DropDownItem = defineComponent({
	props: {
		label: {
			type: String,
			default: ""
		},
		icon: {
			type: String,
			default: ""
		}
	},
	setup(props) {
		let hide: any = inject("hide")
		return () => (
			<div class="dropdown-itme" onClick={hide}>
				<i class={props.icon}></i>
				<span>{props.label}</span>
			</div>
		)
	}
})
