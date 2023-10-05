import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type BasicInputProps = {
  leftIcon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >
  rightIcon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >
} & InputProps

const BasicSelect = ({
  leftIcon,
  rightIcon = ChevronDownIcon,
  ...inputProps
}: BasicInputProps) => (
  <InputGroup>
    <InputLeftElement>
      <Icon as={leftIcon} color="gray.400" />
    </InputLeftElement>
    <Input {...inputProps} cursor="pointer" />
    <InputRightElement>
      <Icon as={rightIcon} strokeWidth="2" />
    </InputRightElement>
  </InputGroup>
)

export default BasicSelect
