import client from './client';


const getInvoicesForSite= (siteId)=> client.get(`/sites/${siteId}/invoices`);


export default {
  
}
