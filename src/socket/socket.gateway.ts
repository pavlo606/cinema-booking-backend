import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinScreening')
  handleJoinScreening(client: Socket, screeningId: number) {
    client.join(`screening_${screeningId}`);
  }

  @SubscribeMessage('leaveScreening')
  handleLeaveScreening(client: Socket, screeningId: number) {
    client.leave(`screening_${screeningId}`);
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket): string {
    return 'pong';
  }

  broadcastSeatsUpdate(screeningId: number, seats: any) {
    this.server.to(`screening_${screeningId}`).emit('seatsUpdated', seats);
  }
}
