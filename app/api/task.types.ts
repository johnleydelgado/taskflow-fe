export interface CreateTaskPayload {
  title: string;
  description: string;
  assigneeEmails: string[];
}


export interface CreateRespondTaskPayload {
  token: string;
  action: 'approve' | 'reject';
}
export interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: string[];    
  status: "Pending" | "Approved" | "Rejected";
  token: string;            
  tokenExpires: string;     
  responded: boolean;       
  createdAt: string;
  updatedAt: string;
  __v: number;
}