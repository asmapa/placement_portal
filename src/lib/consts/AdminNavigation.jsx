import {
	HiOutlineViewGrid,
	HiOutlineUserGroup,
	HiOutlineOfficeBuilding,
	HiOutlineCloudUpload,
	HiOutlineClipboardCheck
} from 'react-icons/hi';

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/student-dashboard', // Full path for the root
		icon: <HiOutlineViewGrid className/> // Dashboard overview icon
	},
	{
		key: 'ViewStudents',
		label: 'View Students',
		path: '/student-dashboard/ViewStudents', // Correct relative path
		icon: <HiOutlineUserGroup /> // Group/people icon for students
	},
	{
		key: 'RegisterCompany',
		label: 'Register Company',
		path: '/student-dashboard/RegisterCompany', // Correct relative path
		icon: <HiOutlineOfficeBuilding /> // Office/organization icon for companies
	},
	{
		key: 'UploadOrDeleteDrive',
		label: 'Upload/Delete Drive',
		path: '/student-dashboard/UploadOrDeleteDrive', // Correct relative path
		icon: <HiOutlineCloudUpload /> // Cloud upload icon for file operations
	},
	{
		key: 'PublishResult',
		label: 'Publish Result',
		path: '/student-dashboard/PublishResult', // Correct relative path
		icon: <HiOutlineClipboardCheck /> // Clipboard check icon for results
	}
];
