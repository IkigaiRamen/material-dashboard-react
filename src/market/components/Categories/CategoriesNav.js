import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css'
import { BsHouseDoorFill, BsFillHouseFill, BsFillPuzzleFill } from 'react-icons/bs'
import { AiFillCar } from 'react-icons/ai';
import { GiFlowerPot, GiClothes } from 'react-icons/gi';
import { TiSortAlphabetically } from 'react-icons/ti';
import { MdPhoneAndroid } from 'react-icons/md'
import MDButton from "components/MDButton";

function CategoriesNav() {
    return (
        <div className="container" id="categories">
            <h1>Categories</h1>
            <Link to="/categories/all">
           
                <MDButton color ="primary" variant="gradient" id="all"><TiSortAlphabetically />All</MDButton>{' '}
            </Link>
            <Link to="/categories/Food">
                <MDButton color ="primary" variant="gradient" id="Food"><BsHouseDoorFill />Food crops</MDButton>{' '}
            </Link>
            <Link to="/categories/Feed">
                <MDButton color ="primary" variant="gradient" id="Feed"><AiFillCar />feed crops</MDButton>{' '}
            </Link>
            <Link to="/categories/Fiber">
                <MDButton color ="primary" variant="gradient" id="Fiber"><BsFillHouseFill />fiber crops</MDButton>{' '}
            </Link>
            <Link to="/categories/Oil">
                <MDButton color ="primary" variant="gradient" id="Oil"><MdPhoneAndroid />oil crops</MDButton>{' '}
            </Link>
            <Link to="/categories/Ornamental">
                <MDButton color ="primary" variant="gradient" id="Ornamental"><GiClothes /> ornamental crops</MDButton>{' '}
            </Link>
            <Link to="/categories/Industrial">
                <MDButton color ="primary" variant="gradient" id="Industrial"><BsFillPuzzleFill />industrial crops</MDButton>{' '}
            </Link>
            <Link to="/categories/Garden">
                <MDButton color ="primary" variant="gradient" id="Garden"><GiFlowerPot />Garden</MDButton>{' '}
            </Link>
        </div>
    )
}

export default CategoriesNav;