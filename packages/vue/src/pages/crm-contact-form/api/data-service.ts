import http from '@/api/http';
import { Opportunity } from '@/types/opportunities';

class ContactDataService {
  public getActiveContactOpportunities = (id: number) => this.getContactOpportunities(id, true);

  public getClosedContactOpportunities = (id: number) => this.getContactOpportunities(id, false);

  public getContactOpportunities = (id: number, isActive: boolean) => http
    .get<Opportunity[]>(`/Users/Contacts/${id}/Opportunities`)
    .then((response) => response.data.filter((_: Opportunity, index: number) => {
      const isEven = index % 2 === 0;
      return isActive ? isEven : !isEven;
    }));
}

export default new ContactDataService();
