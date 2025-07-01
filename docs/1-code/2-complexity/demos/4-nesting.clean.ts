// * Avoid nest callbacks and ternary operators

import { Client, Invoice } from "./types";
// Simulating an async function to get clients
function getClients(): Promise<Client[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: "1", status: "VIP", orders: [] }]);
    }, 1000);
  });
}

// Simulating an async function to get invoices for a client
const getInvoicesForClient = (client: string): Promise<Invoice[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          orderId: "1",
          date: new Date(),
          clientId: client,
          subTotal: 1000,
          discount: 100,
          tax: 200,
          total: 1100,
        },
      ]);
    }, 1000);
  });
};

function main() {
  getClients().then(async (clients) => processClients(clients));
}

function processClients(clients: Client[]) {
  for (const client of clients) {
    getInvoicesForClient(client.id).then((invoices) => handleClientInvoices(invoices, client));
  }
}

function getShipmentType(invoice: Invoice, client: Client): string {
  if (client.status === "defaulter") {
    return "none";
  }
  if (client.status === "VIP") {
    return "deluxe";
  }
  if (invoice.total > 1000) {
    return "express";
  }
  return "regular";
}

function handleClientInvoices(invoices: Invoice[], client: Client) {
  invoices.forEach((invoice) => {
    const shipment = getShipmentType(invoice, client);
    console.log(`Shipment ${shipment} for invoice ${invoice.date}`);
    console.log(`Invoice ${invoice} for ${client}`);
  });
}

main();
