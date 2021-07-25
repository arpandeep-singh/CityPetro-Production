import client from "./client";

const endpoint = "/sites";
const getSites = () => client.get(endpoint);

const addSite = (site) => {
  const data = {
    customerName: site.customerName,
    email: site.customerEmail,
    contact: site.customerContact,
    address: site.address,
    description: site.description,
    onCash: site.onCash,
    totalCost: site.totalCost,
    company: site.company,
  };
  return client.post(endpoint, data);
};

const getSiteDetail = (id) => client.get(`${endpoint}/${id}`);

const createInvoice = (id, amt) => {
  const data = { amount: amt };
  return client.post(`sites/${id}/invoices`, data);
};

const getInvoices = (siteId) => client.get(`/sites/${siteId}/invoices`);

const getInvoicePreview = (siteId) =>
  client.get(`/sites/${siteId}/invoice-preview`);

export default {
  getSites,
  addSite,
  getSiteDetail,
  createInvoice,
  getInvoices,
  getInvoicePreview,
};
