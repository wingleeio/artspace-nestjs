import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
	const [menu, setMenu] = useState(false);
	const { user, isAuthenticated } = useSelector(state => ({ ...state.user }));
	const menuStyle = () => ({
		maxHeight: menu === true ? '1000px' : '0px',
	});
	const toggleMenu = () => {
		if (menu) {
			setMenu(false);
		} else {
			setMenu(true);
		}
	};
	return (
		<>
			<header>
				<nav>
					<div className='logo'>
						<Link to='/browse'>
							{/* <img src="#" /> */}
							<span className='txt-is-primary'>ART.</span>SPACE
						</Link>
					</div>
					<ul>
						<li className='desktop'>
							<Link to='/browse'>Browse</Link>
						</li>
						{/* <li>
            <Link to="/">Search</Link>
          </li> */}
						{!isAuthenticated ? (
							<>
								<li className='desktop'>
									<Link
										to='/register'
										type='submit'
										className='register'>
										Register
									</Link>
								</li>
								<li className='desktop'>
									<Link to='/login' className='login'>
										Login
									</Link>
								</li>
							</>
						) : (
							<>
								<li className='desktop'>
									<Link
										to='/submit'
										className='login btn btn-success'>
										Submit
									</Link>
								</li>
								<li>
									<Link to={`/profile/${user.username}`}>
										<img
											src={user.avatar}
											style={{
												width: '32px',
												height: '32px',
											}}
										/>
									</Link>
								</li>
								<li className='desktop'>
									<Link to='/logout' className='login'>
										Logout
									</Link>
								</li>
							</>
						)}
						<li className='mobile burger' onClick={toggleMenu}>
							<div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</li>
					</ul>
				</nav>
			</header>

			<div className='mobile-menu' style={menuStyle()}>
				<ul>
					<li onClick={toggleMenu}>
						<Link to='/browse'>Browse</Link>
					</li>
					{!isAuthenticated ? (
						<>
							<li onClick={toggleMenu}>
								<Link to='/' type='submit' className='register'>
									Register
								</Link>
							</li>
							<li onClick={toggleMenu}>
								<Link to='/login' className='login'>
									Login
								</Link>
							</li>
						</>
					) : (
						<>
							<li onClick={toggleMenu}>
								<Link to='/submit'>Submit</Link>
							</li>
							<li onClick={toggleMenu}>
								<Link to='/logout' className='login'>
									Logout
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</>
	);
}

export default Header;
