import { WebPartContext } from "@microsoft/sp-webpart-base"; 
export interface IProfileCardProps {
  Title: string;
  Name: string;
  Role: string;
  Description: string;
  Picture: string;
  context:WebPartContext; 
}
