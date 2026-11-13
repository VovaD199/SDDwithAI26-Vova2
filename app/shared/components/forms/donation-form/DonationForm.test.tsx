import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import DonationForm from './DonationForm';

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: () => <svg data-testid="mock-chevron" />
}));

jest.mock('~/ds-components/button/Button', () => {
  const MockButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { fullWidth?: boolean }> = ({
    children,
    fullWidth: _fullWidth,
    ...props
  }) => <button {...props}>{children}</button>;

  return {
    __esModule: true,
    default: MockButton
  };
});

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      donationTitle: 'ШВИДКО ЗАДОНАТИТИ:',
      subscribeTitle: 'ПІДПИСАТИСЯ:',
      donationSwitch: 'Разовий внесок',
      subscribeSwitch: 'Підписка',
      donationButton: 'Зробити внесок',
      subscribeButton: 'Підписатися'
    };
    return messages[key] || key;
  },
  useLocale: () => 'uk'
}));

describe('DonationForm', () => {
  beforeAll(() => {
    class ResizeObserver {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    }

    Object.defineProperty(global, 'ResizeObserver', {
      writable: true,
      configurable: true,
      value: ResizeObserver
    });
  });

  beforeEach(() => {
    render(<DonationForm />);
  });

  it('should render default donation form', () => {
    expect(screen.getByText('ШВИДКО ЗАДОНАТИТИ:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('should show entered value', () => {
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '100' } });
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('should switch currency', () => {
    fireEvent.click(screen.getByText('200'));
    expect(screen.getByDisplayValue('200')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('USD'));
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('should render demo disabled donation placeholder', () => {
    expect(screen.getByText('Donation payments are disabled in this demo.')).toBeInTheDocument();
    expect(screen.getByText('Зробити внесок').closest('button')).toBeDisabled();
  });
});
