import React from "react";

const SachLoader = () => {
    return <>
    <div id="preloader">
		<img src={require("../../static/admin/img/sach.svg").default} className="sach-icon-animate" alt="Sach Logo" />
	</div>
    </>
}

export default SachLoader;