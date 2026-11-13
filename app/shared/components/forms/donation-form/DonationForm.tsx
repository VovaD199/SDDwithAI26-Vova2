'use client';
import { Box, FormControl, Input, MenuItem, Select, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useState } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import PaperComponent from '~/components/paper-component/PaperComponent';
import Button from '~/ds-components/button/Button';
import { mainHexPallete } from '~/ds-components/theme/colors';

import { style } from './DonationForm.styles';
import { Currency } from '~/types/types/common.types';

import ChevronDown from '~/public/icons/chevron-down.svg';
import ChevronUp from '~/public/icons/chevron-up.svg';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

const currencies: Currency[] = ['UAH', 'USD', 'EUR', 'GBP'];
const proposedSum: Record<Currency, number[]> = {
  UAH: [200, 500, 700],
  USD: [10, 25, 50],
  EUR: [10, 20, 50],
  GBP: [10, 20, 40]
};

const DropdownIcon = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const isOpen = typeof props.className === 'string' && props.className.includes('iconOpen');

  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        transform: 'translateY(-1px) !important'
      }}
    >
      <Svg
        Component={isOpen ? ChevronUp : ChevronDown}
        alt="chevron"
        stroke={mainHexPallete.black}
        width="24px"
        height="24px"
        sx={{ display: 'flex' }}
      />
    </Box>
  );
};

function DonationForm() {
  const t = useTranslations('donationForm');
  const { isMobile } = useBreakpoints();
  const [donationSum, setDonationSum] = useState<number | ''>('');
  const [currency, setCurrency] = useState<Currency>('UAH');
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleCurrencySwitch = (event: { target: { value: string } }) => {
    setCurrency(event.target.value as Currency);
    setDonationSum('');
  };

  const suggestButtons = proposedSum[currency].map((item) => (
    <Button
      key={item}
      id={item.toString()}
      variant="outlined"
      size={isMobile ? 'small' : 'medium'}
      sx={style.currencySuggestionBtns}
      onClick={() => {
        setDonationSum(item);
      }}
      data-testid={`DonationForm-suggestButton-${item}`}
    >
      <Typography variant="customSemiBold18">{item}</Typography>
      <Typography variant="customMedium16" sx={style.currencySuggestion}>
        {currency}
      </Typography>
    </Button>
  ));
  const currencyItems = currencies.map((c) => (
    <MenuItem key={c} value={c}>
      <Typography variant="body1">{c.toUpperCase()}</Typography>
    </MenuItem>
  ));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' || +e.target.value < 0 ? '' : Number(e.target.value);
    setDonationSum(val);
  };

  return (
    <PaperComponent sx={style.paper} childrenSx={style.paperChildren} square data-testid="DonationForm">
      <Box sx={style.headerTexts}>
        <Typography data-testid="DonationForm-title" variant="h4">
          {t('donationTitle')}
        </Typography>
        <Typography data-testid="DonationForm-description" variant="customSemiBold18">
          {t('donationDescription')}
        </Typography>
      </Box>
      <Box sx={style.formContent}>
        <Box sx={style.amountSection}>
          <Box sx={style.sumInputs}>
            <Input
              disableUnderline
              type="number"
              value={donationSum}
              onChange={handleInputChange}
              placeholder="0"
              sx={style.moneyInput}
              data-testid="DonationForm-moneyInput"
            />
            <FormControl variant="standard" sx={style.currencyInput}>
              <Select
                open={openDropdown}
                onOpen={() => setOpenDropdown(true)}
                onClose={() => setOpenDropdown(false)}
                disableUnderline
                value={currency}
                onChange={handleCurrencySwitch}
                data-testid="DonationForm-currencySelect"
                IconComponent={DropdownIcon}
              >
                {currencyItems}
              </Select>
            </FormControl>
          </Box>
          <Box sx={style.addBtns} data-testid="DonationForm-suggestButtonsContainer">
            {suggestButtons}
          </Box>
        </Box>

        <Typography variant="body2">Donation payments are disabled in this demo.</Typography>
        <Button
          color="primary"
          variant="contained"
          size={isMobile ? 'medium' : 'large'}
          fullWidth
          disabled
          data-testid="DonationForm-donateButton"
        >
          <Typography variant="customSemiBold18">{t('donationButton')}</Typography>
        </Button>
      </Box>
    </PaperComponent>
  );
}
export default DonationForm;
