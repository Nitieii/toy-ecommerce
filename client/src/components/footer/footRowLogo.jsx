import React from 'react';
import image from '../../assets/img/core-img/logo2.png'

function FootRowLogo() {
	return (
		<div className="col-12 col-lg-4">
			<div className="single_widget_area">
				<div className="footer-logo mr-50">
					<a href="index.html"><img src={ image } alt="" /></a>
				</div>
				<p className="copywrite">
					Copyright ©
					<script>document.write(new Date().getFullYear());</script>
					2020 All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by
					<a href="https://colorlib.com" target="_blank">Colorlib</a>
				</p>
			</div>
		</div>
	);
}

export default FootRowLogo;