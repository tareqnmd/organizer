import Submenu from '../core/navbar/Submenu';
const links = [
	{ path: '/config', name: 'Global', exact: true },
	{ path: '/config/hisab', name: 'Hisab' },
];

const ConfigLinks = () => {
	return <Submenu links={links} />;
};

export default ConfigLinks;