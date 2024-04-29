import { prisma } from "../db/prisma-client";
import { PurchaseOrderAndTicketsCreate, PurchaseOrderRepository } from "../interfaces/purchaseOrder.interface";

class PurchaseOrderRepositoryPrisma implements PurchaseOrderRepository {

    async create(data: PurchaseOrderAndTicketsCreate): Promise<any> {
        try {
            const { userId, eventId, ticketTypeId, quantityTickets, participantName, participantEmail, status } = data;
            return await prisma.$transaction(async (prisma) => {
                const ticketType = await prisma.ticketType.findUnique({
                    where: { id: ticketTypeId }
                });

                if (!ticketType || ticketType.quantity < quantityTickets) {
                    throw new Error(`Insufficient ticket quantity available. Available: ${ticketType?.quantity}, Requested: ${quantityTickets}`);   
                }
                const purchaseOrder = await prisma.purchaseOrder.create({
                    data: {
                        userId,
                        eventId,
                        totalPrice: ticketType.price * quantityTickets,
                        quantityTickets,
                        status
                    }
                });

                await prisma.ticket.createMany({
                    data: Array.from({ length: quantityTickets }).map(() => ({
                        ticketTypeId,
                        purchaseOrderId: purchaseOrder.id,
                        participantName,
                        participantEmail,
                        price: ticketType.price,
                        status: 'issued',
                        purchaseDate: new Date(),
                    }))
                });

                await prisma.ticketType.update({
                    where: { id: ticketTypeId },
                    data: { quantity: ticketType.quantity - quantityTickets }
                });
    
                return purchaseOrder;
            });
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}

export { PurchaseOrderRepositoryPrisma };
