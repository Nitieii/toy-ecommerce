import SpchTotalProducts from "./itemsHead/spchTotalProducts";
import SpchSorting from "./itemsHead/spchSorting";

function SpcRowHead() {
	return (
		<div className="row">
			<div className="col-12">
				<div className="product-topbar d-xl-flex align-items-end justify-content-between">
					<SpchTotalProducts />
					<SpchSorting />
				</div>
			</div>
		</div>
	);
}

export default SpcRowHead;