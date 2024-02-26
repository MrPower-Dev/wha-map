import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Menu() {
	const location = useLocation();
	const currentPath = location.pathname;
	const navigateTo = useNavigate();

	const handleRedirect = (goto) => {
		navigateTo(goto);
	};

  return (
		<div style={{ textAlign: 'center' }}>
			<button onClick={() => handleRedirect('/Map-Display-with-Markers')} className={currentPath === '/Map-Display-with-Markers' ? 'btn-active' : ''}>
				Map Display with Markers
			</button>
			<button onClick={() => handleRedirect('/User-Location-and-Search')} className={currentPath === '/User-Location-and-Search' ? 'btn-active' : ''}>
				User Location and Search
			</button>
			<button onClick={() => handleRedirect('/Directions-Functionality')} className={currentPath === '/Directions-Functionality' ? 'btn-active' : ''}>
				Directions Functionality
			</button>
		</div>
  );
}

export default Menu;
