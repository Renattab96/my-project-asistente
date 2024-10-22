export interface TaskResponse {
    additionalInfo:       AdditionalInfo;
    _id:                  string;
    username:             string;
    lastname:             string;
    email:                string;
    password:             string;
    confirmpassword:      string;
    notificationsEnabled: boolean;
    role:                 string;
    loginAttempts:        number;
    tasks:                TaskToResponse[];
    __v:                  number;
}

interface AdditionalInfo {
    address:          string;
    birthDate:        Date;
    jobTitle:         string;
    notificationTime: string;
    phoneNumber:      string;
}

export interface TaskToResponse {
    _id:              string;
    user:             User;
    title:            string;
    description:      string;
    status:           string;
    history:          History[];
    startDate:        Date;
    endDate:          Date;
    taskType:         string;
    notificationTime: string;
    __v:              number;
}

interface History {
    status: string;
    date:   Date;
    _id:    string;
}

interface User {
    _id:      string;
    username: string;
    role:     string;
}



