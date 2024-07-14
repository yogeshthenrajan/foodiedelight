import { render, screen } from "@testing-library/react";
import { expect, test  } from "vitest";
import { Error404 } from "@/components/http-errors";

test('404 image should be displayed', () => {
   render(<Error404 />)

   const image = screen.getByAltText('Page not found')

   expect(image).toBeInTheDocument();
})