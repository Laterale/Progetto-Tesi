import React, { FC, useState } from "react";
import { useDictionary } from "~/lib/i18n";
import TextType from "./spokenText";
import Stepper, { Step } from "./stepper";

export const MenuTextBox: FC<{ className?: string; onAllStepsCompleted?: () => void }> = ({ onAllStepsCompleted }) => {
  const { menu: dictionary } = useDictionary();
  const page = [dictionary.p1, dictionary.p2, dictionary.p3, dictionary.p4];
  const [shownPages, setShownPages] = useState(new Set<number>());

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        setShownPages(prev => new Set(prev).add(step - 1));
      }}
      onFinalStepCompleted={onAllStepsCompleted}
      backButtonText="<"
      nextButtonText=">"
      stepCircleContainerClassName=""
      disableStepIndicators
    >
      <Step>
        <div className="text-center">
          {/*shownPages.has(1)*/true ?(
            <p className="text-lg tracking-wide break-words mb-4 text-balance">
              {page[0] ?? ""}
            </p>
            ) : (
            <TextType
            className="text-lg tracking-wide break-words mb-4"
            text={page[0] ?? ""}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter=""
            textColors={["black"]}
            />
            )
          }
        </div>
      </Step>
      <Step>
        <div className="text-center">
          {/*shownPages.has(2)*/true ?(
            <p className="text-lg tracking-wide break-words mb-4 text-balance">
              {page[1] ?? ""}
            </p>
            ) : (
            <TextType
            className="text-lg tracking-wide break-words mb-4"
            text={page[1] ?? ""}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter=""
            textColors={["black"]}
            />
            )
          }
        </div>
      </Step>
      <Step>
        <div className="text-center">
          {/*shownPages.has(3)*/true ?(
            <p className="text-lg tracking-wide break-words mb-4 text-balance">
              {page[2] ?? ""}
            </p>
            ) : (
            <TextType
            className="text-lg tracking-wide break-words mb-4"
            text={page[2] ?? ""}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter=""
            textColors={["black"]}
            />
            )
          }
        </div>
      </Step>
      <Step>
        <div className="text-center">
          {/*shownPages.has(4)*/true ?(
            <p className="text-lg tracking-wide break-words mb-4 text-balance">
              {page[3] ?? ""}
            </p>
            ) : (
            <TextType
            className="text-lg tracking-wide break-words mb-4"
            text={page[3] ?? ""}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter=""
            textColors={["black"]}
            />
            )
          }
        </div>
      </Step>
    </Stepper>
  );
};

export const MapTextBox: FC<{ className?: string; onAllStepsCompleted?: () => void; updateMap?: (step: number) => void}> = ({ onAllStepsCompleted, updateMap}) => {
  const { euMap: dictionary } = useDictionary();
  const page = [dictionary.p0, dictionary.p1, dictionary.p2, dictionary.p3, dictionary.p4];
  const [shownPages, setShownPages] = useState(new Set<number>());

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        if (updateMap) {
          updateMap(step);
        }
        setShownPages(prev => new Set(prev).add(step - 1));
      }}
      onFinalStepCompleted={onAllStepsCompleted}
      backButtonText="<"
      nextButtonText=">"
      stepCircleContainerClassName=""
      disableStepIndicators
    >
      <Step>
        <div className="text-sm">
          {/*shownPages.has(1)*/true ?(
            <p className=" tracking-wide break-words mb-2 text-left">
              {page[0] ?? ""}
            </p>
            ) : (
            <TextType
            className="tracking-wide break-words mb-2"
            text={page[0] ?? ""}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter=""
            textColors={["black"]}
            />
            )
          }
        </div>
      </Step>
      <Step>
        <div className="text-sm">
          {/*shownPages.has(2)*/true ?(
            <p className="tracking-wide break-words mb-2">
              {page[1] ?? ""}
            </p>
            ) : (
            <TextType
            className="tracking-wide break-words mb-2"
            text={page[1] ?? ""}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter=""
            textColors={["black"]}
            />
            )
          }
        </div>
      </Step>
      <Step>
        <div className="text-sm">
          {/*shownPages.has(3)*/true ?(
            <p className="tracking-wide break-words mb-2">
              {page[2] ?? ""}
            </p>
            ) : (
            <TextType
            className="tracking-wide break-words mb-2"
            text={page[2] ?? ""}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter=""
            textColors={["black"]}
            />
            )
          }
        </div>
      </Step>
      <Step>
        <div className="text-sm">
          {/*shownPages.has(4)*/true ?(
            <p className="tracking-wide break-words mb-2">
              {page[3] ?? ""}
            </p>
            ) : (
            <TextType
            className="tracking-wide break-words mb-2"
            text={page[3] ?? ""}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter=""
            textColors={["black"]}
            />
            )
          }
        </div>
      </Step>
            <Step>
        <div className="text-sm">
          {/*shownPages.has(4)*/true ?(
            <p className="tracking-wide break-words mb-2">
              {page[4] ?? ""}
            </p>
            ) : (
            <TextType
            className="tracking-wide break-words mb-2"
            text={page[4] ?? ""}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter=""
            textColors={["black"]}
            />
            )
          }
        </div>
      </Step>
    </Stepper>
  );
};

