import { MessageService } from './message.service';

describe('Message Service', () => {
  beforeEach(() => {
    //
  });

  it('should have no messages to start with', () => {
    const messageService = new MessageService();

    expect(messageService.messages.length).toEqual(0);
  });

  it('should add message', () => {
    const messageService = new MessageService();
    const message = 'message1';

    messageService.add(message);

    expect(messageService.messages.length).toEqual(1);
    expect(messageService.messages[0]).toEqual(message);
  });

  it('should clear all messages', () => {
    const messageService = new MessageService();
    const message = 'message1';
    messageService.add(message);

    messageService.clear();

    expect(messageService.messages.length).toEqual(0);
  });
});
