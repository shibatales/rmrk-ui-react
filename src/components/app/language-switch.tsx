import React, { ChangeEvent } from 'react';
import { Box, Select } from '@chakra-ui/react';
import { locales } from 'lib/common/locales';
import { useRouter } from 'next/router';

const LanguageSwitch = () => {
  const router = useRouter();
  const { locale, asPath } = router;

  const optionList = Object.values(locales);

  const changeLocale = (event: ChangeEvent<HTMLSelectElement>) => {
    router.push(asPath, asPath, { locale: event.target.value });
  };

  return (
    <Box data-name="language-switch">
      <Select
        value={locale}
        onChange={changeLocale}
        size="xs"
        w="70px"
        borderRadius="6px"
        lineHeight="24px"
        fontFamily="mono">
        {optionList.map((item) => (
          <option key={`language-option-${item.value}`} value={item.value}>
            {item.text}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default LanguageSwitch;
