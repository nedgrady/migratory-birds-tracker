import { RecoilState, useRecoilState } from "recoil"

function useRecoilArray<TItem>(recoilState: RecoilState<TItem[]>) {
	const [array, setArray] = useRecoilState<TItem[]>(recoilState)

	function add(item: TItem) {
		setArray([...array, item])
	}

	// function remove(index) {
	// 	setArray([...array.slice(0, index), ...array.slice(index + 1)])
	// }

	// function update(index, item) {
	// 	setArray([...array.slice(0, index), item, ...array.slice(index + 1)])
	// }

	return { array, add }
}

export default useRecoilArray
