import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/Logo-Full-Light.png'
import { NavbarLinks } from '../../../data/navbar-links'

const NavBar = () => {
    return (
        <div className='flex h-14 items-center justify-center broder-b-[1px] border-b-richblack-700'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

                <Link to='/'>
                    <img src={Logo} alt="" />
                </Link>

                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>

                        {
                            NavbarLinks.map((link, index) => {
                                return (
                                    <li key={index}>
                                        link.title === "Catalog" ? (<div></div>) : (
                                        <Link to={link?.path}>
                                            <p className='text-yellow-25'>
                                                {link.title}
                                            </p>

                                        </Link>
                                        )
                                    </li>
                                )
                            })
                        }

                    </ul>
                </nav>

            </div>
        </div>
    )
}

export default NavBar
