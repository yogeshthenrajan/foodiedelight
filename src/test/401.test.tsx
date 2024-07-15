import { render, screen } from "@testing-library/react";
import { expect, test  } from "vitest";
import { Error401 } from "@/components/http-errors";

test('401 image should be displayed', () => {
   render(<Error401 />)

   const image = screen.getByAltText('Unauthorised')

   expect(image).toBeInTheDocument();
})