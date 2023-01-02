import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react'

export function PasswordPatternMsg() {
  return (
    <Box data-testid="password-pattern-msg" fontSize="sm" color="red.500">
      <Text>Senha deve conter pelo menos:</Text>
      <UnorderedList>
        <ListItem>8 caracteres</ListItem>
        <ListItem>1 letra maiúscula</ListItem>
        <ListItem>1 caractere especial</ListItem>
        <ListItem>1 número</ListItem>
      </UnorderedList>
    </Box>
  )
}
