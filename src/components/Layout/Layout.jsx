import { Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';
import Header from '../Header';

export default function Layout() {
    return (
        <div className={classes.wrapper__app}>
            <Header />
            <Outlet />
        </div>
    );
}
