import { Ticket, TicketStatus, TicketType } from "@/types/customer-support/customer-support.interface"
import { OrderStatus } from "@/types/order/order.interface"

export interface Message {
    id: string
    ticket_id: string
    sender_id: string
    sender_type: "USER" | "ADMIN"
    message: string
    images?: string[]
    created_at: string
}

export interface Session {
    id: string
    ticket_id: string
    messages: Message[]
    user_name: string
    admin_name?: string
    status: "ACTIVE" | "CLOSED"
}

export const mockMessages: Message[] = [
    {
        id: "1",
        ticket_id: "ticket-123",
        sender_id: "user-1",
        sender_type: "USER",
        message: "Hi, I'm having an issue with my recent order. The product I received is damaged.",
        created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
        id: "2",
        ticket_id: "ticket-123",
        sender_id: "admin-1",
        sender_type: "ADMIN",
        message: "Hello! I'm sorry to hear about the damaged product. I'd be happy to help you with this. Can you please provide your order number?",
        created_at: new Date(Date.now() - 3500000).toISOString(),
    },
    {
        id: "3",
        ticket_id: "ticket-123",
        sender_id: "user-1",
        sender_type: "USER",
        message: "Sure, my order number is #ORD123456",
        created_at: new Date(Date.now() - 3400000).toISOString(),
    },
    {
        id: "4",
        ticket_id: "ticket-123",
        sender_id: "admin-1",
        sender_type: "ADMIN",
        message: "Thank you! Let me look into this for you. Could you also share some photos of the damaged product?",
        created_at: new Date(Date.now() - 3300000).toISOString(),
    },
    {
        id: "5",
        ticket_id: "ticket-123",
        sender_id: "user-1",
        sender_type: "USER",
        message: "Here are the photos of the damage.",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop&crop=center"
        ],
        created_at: new Date(Date.now() - 3200000).toISOString(),
    },
    {
        id: "6",
        ticket_id: "ticket-123",
        sender_id: "admin-1",
        sender_type: "ADMIN",
        message: "Thank you for the photos. I can see the damage clearly. We'll send you a replacement right away. You should receive it within 3-5 business days. Would that work for you?",
        created_at: new Date(Date.now() - 3100000).toISOString(),
    },
    {
        id: "7",
        ticket_id: "ticket-123",
        sender_id: "user-1",
        sender_type: "USER",
        message: "That sounds perfect! Thank you so much for your help.",
        created_at: new Date(Date.now() - 3000000).toISOString(),
    },
    {
        id: "8",
        ticket_id: "ticket-123",
        sender_id: "admin-1",
        sender_type: "ADMIN",
        message: "You're welcome! I've processed the replacement order. You'll receive a tracking number via email shortly. Is there anything else I can help you with?",
        created_at: new Date(Date.now() - 2900000).toISOString(),
    },
    {
        id: "9",
        ticket_id: "ticket-123",
        sender_id: "user-1",
        sender_type: "USER",
        message: "No, that's all. Thank you again!",
        created_at: new Date(Date.now() - 2800000).toISOString(),
    },
]

export const mockTicket: Ticket = {
    id: "ticket-123",
    title: "Product Damaged - Need Replacement",
    description: "I received my order yesterday, but the product was damaged during shipping. The packaging was also torn. I would like to request a replacement as soon as possible.",
    user_id: "user-1",
    user: {
        id: "user-1",
        name: "John Doe",
        email: "john.doe@example.com",
        role: {
            id: "role-1",
            name: "customer",
            created_at: new Date(Date.now() - 3600000 * 4).getTime().toString(),
            updated_at: new Date(Date.now() - 3600000 * 2).getTime().toString()
        },
        phone: "+1234567890",
        gender: "Male",
        provider: "email",
        avatar: ""
    },
    order_id: "order-123",
    order: {
        id: "order-123",
        customer_id: "user-1",
        customer_name: "John Doe",
        customer_email: "john.doe@example.com",
        customer_phone: "+1234567890",
        customer_address: "123 Main St",
        customer_city: "New York",
        customer_zip: "10001",
        customer_country: "USA",
        payment_method: "Credit Card",
        total_amount: 299.99,
        tax_amount: 24.00,
        shipping_amount: 15.00,
        sub_total: 260.99,
        status: OrderStatus.PAID,
        created_at: new Date(Date.now() - 86400000 * 2).getTime().toString(),
        updated_at: new Date(Date.now() - 86400000 * 2).getTime().toString(),
        items: [
            {
                id: "item-1",
                order_id: "order-123",
                variant_id: "variant-1",
                quantity: 1,
                unit_price: 260.99,
                total_price: 260.99,
                variant: {
                    id: "variant-1",
                    product_id: "product-1",
                    stock: 50,
                    price: 260.99,
                    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
                    color: "Black",
                    color_code: "#000000",
                    size: "M",
                    product: { 
                        id: "product-1",
                        brand: "Brand 1",
                        collection_id: "collection-1",
                        collection: {
                            id: "collection-1",
                            name: "Collection 1",
                            created_at: new Date(Date.now() - 3600000 * 4).getTime().toString(),
                            updated_at: new Date(Date.now() - 3600000 * 2).getTime().toString()
                        },
                        gender: "Male",
                        basePrice: 100,
                        discount: 0,
                        currency: "USD",
                        mainImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
                        isFeatured: false,
                        isActive: true,
                        variants: [],
                        created_at: new Date(Date.now() - 3600000 * 4).getTime().toString(),
                        updated_at: new Date(Date.now() - 3600000 * 2).getTime().toString(),
                        name: "Premium Wireless Headphones",
                        slug: "premium-wireless-headphones",
                        description: "High-quality wireless headphones",
                        tags: ["electronics", "audio"],
                        ratingAvg: 4.5,
                        ratingCount: 128,
                        category: {
                            id: "cat-1",
                            name: "Electronics",
                            created_at: new Date(Date.now() - 3600000 * 4).getTime().toString(),
                            updated_at: new Date(Date.now() - 3600000 * 2).getTime().toString()
                        },
                        category_id: "cat-1"
                    }
                }
            }
        ]
    },
    tags: ["product-damage", "replacement", "urgent"],
    type: TicketType.COMPLAINT,
    status: TicketStatus.PENDING,
    images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop&crop=center"
    ],
    created_at: new Date(Date.now() - 3600000 * 4).getTime().toString(),
    updated_at: new Date(Date.now() - 3600000 * 2).getTime().toString()
}

export const mockSession: Session = {
    id: "session-123",
    ticket_id: "ticket-123",
    messages: mockMessages,
    user_name: "John Doe",
    admin_name: "Support Agent Sarah",
    status: "ACTIVE"
}

