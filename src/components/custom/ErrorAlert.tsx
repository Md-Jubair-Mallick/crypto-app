import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui"
import type { FC } from "react"

const ErrorAlert: FC = ({error}) => {
  return (
    <Alert variant="destructive" className="mt-2 absolute top-20 w-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
  )
}

export default ErrorAlert
