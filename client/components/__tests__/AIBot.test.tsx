import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AIBot from '../AIBot';

describe('AIBot Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the bot button', () => {
    render(<AIBot />);
    const botButton = screen.getByRole('button', { name: /open chat bot/i });
    expect(botButton).toBeInTheDocument();
  });

  it('should open the chat window when button is clicked', async () => {
    render(<AIBot />);
    const botButton = screen.getByRole('button', { name: /open chat bot/i });
    
    fireEvent.click(botButton);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/ask me anything/i)).toBeInTheDocument();
    });
  });

  it('should close the chat window when clicked again', async () => {
    render(<AIBot />);
    const botButton = screen.getByRole('button', { name: /open chat bot/i });
    
    fireEvent.click(botButton);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/ask me anything/i)).toBeInTheDocument();
    });
    
    fireEvent.click(botButton);
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/ask me anything/i)).not.toBeInTheDocument();
    });
  });

  it('should display initial greeting message', async () => {
    render(<AIBot />);
    const botButton = screen.getByRole('button', { name: /open chat bot/i });
    
    fireEvent.click(botButton);
    
    await waitFor(() => {
      expect(screen.getByText(/hi! i'm your hr assistant/i)).toBeInTheDocument();
    });
  });

  it('should send a message and receive a response', async () => {
    render(<AIBot />);
    const botButton = screen.getByRole('button', { name: /open chat bot/i });
    
    fireEvent.click(botButton);
    
    const input = await screen.findByPlaceholderText(/ask me anything/i);
    const sendButton = screen.getByRole('button', { name: '' }).closest('button');
    
    await userEvent.type(input, 'hello');
    fireEvent.click(sendButton!);
    
    await waitFor(() => {
      expect(screen.getByText('hello')).toBeInTheDocument();
    });
  });

  it('should respond to common questions', async () => {
    render(<AIBot />);
    const botButton = screen.getByRole('button', { name: /open chat bot/i });
    
    fireEvent.click(botButton);
    
    const input = await screen.findByPlaceholderText(/ask me anything/i);
    const sendButton = screen.getByRole('button').closest('button');
    
    await userEvent.type(input, 'How do I create an employee');
    fireEvent.click(sendButton!);
    
    await waitFor(() => {
      expect(screen.getByText(/To create an employee/i)).toBeInTheDocument();
    });
  });

  it('should clear input after sending message', async () => {
    render(<AIBot />);
    const botButton = screen.getByRole('button', { name: /open chat bot/i });
    
    fireEvent.click(botButton);
    
    const input = await screen.findByPlaceholderText(/ask me anything/i) as HTMLInputElement;
    const sendButton = screen.getByRole('button').closest('button');
    
    await userEvent.type(input, 'test message');
    fireEvent.click(sendButton!);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  it('should disable send button when input is empty', async () => {
    render(<AIBot />);
    const botButton = screen.getByRole('button', { name: /open chat bot/i });
    
    fireEvent.click(botButton);
    
    const input = await screen.findByPlaceholderText(/ask me anything/i);
    
    expect(input).toBeInTheDocument();
    // Input should be empty and send button should be disabled
    const sendButtons = screen.getAllByRole('button');
    const sendBtn = sendButtons[sendButtons.length - 1]; // Last button is send
    
    expect(sendBtn).toBeDisabled();
  });
});
