type UserType = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'colaborator' | 'support' | 'teamLead' | 'projectLead';
    profilePicture: string;
}

export default UserType;
