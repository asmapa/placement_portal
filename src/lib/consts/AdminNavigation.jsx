import {
	HiOutlineViewGrid,
	HiOutlineUserGroup,
	HiOutlineOfficeBuilding,
	HiOutlineCloudUpload,
	HiOutlineClipboardCheck,
	HiUserAdd
} from 'react-icons/hi';

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/Admin-dashboard', // Full path for the root
		icon: <HiOutlineViewGrid className/> // Dashboard overview icon
	},
	{
		key: 'ViewStudents',
		label: 'View Students',
		path: '/Admin-dashboard/ViewStudents', // Correct relative path
		icon: <HiOutlineUserGroup /> // Group/people icon for students
	},
	{
		key: 'RegisterCompany',
		label: 'Register Company',
		path: '/Admin-dashboard/RegisterCompany', // Correct relative path
		icon: <HiOutlineOfficeBuilding /> // Office/organization icon for companies
	},
	{
		key: 'UploadOrDeleteDrive',
		label: 'Upload/Delete Drive',
		path: '/Admin-dashboard/UploadOrDeleteDrive', // Correct relative path
		icon: <HiOutlineCloudUpload /> // Cloud upload icon for file operations
	},
	{
		key: 'PublishResult',
		label: 'Publish Result',
		path: '/Admin-dashboard/PublishResult', // Correct relative path
		icon: <HiOutlineClipboardCheck /> // Clipboard check icon for results
	},
	{
		key: 'AddStudents',
		label: 'Add Students',
		path: '/Admin-dashboard/AddStudents', // Correct relative path
		icon: <HiUserAdd /> // Clipboard check icon for results
	}
];
