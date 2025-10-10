import React, { FC, useState } from "react";
import { useDictionary } from "~/lib/i18n";
import TextType from "./spokenText";
import Stepper, { Step } from "./stepper";

export const MenuTextBox: FC<{ className?: string; onAllStepsCompleted?: () => void, updateStep?: (step: number) => void }> = ({ onAllStepsCompleted, updateStep }) => {
  const { menu: dictionary } = useDictionary();
  const page = [dictionary.p1, dictionary.p2, dictionary.p3, dictionary.p4];
  const [shownPages, setShownPages] = useState(new Set<number>());

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        if (updateStep) {
          updateStep(step);
        }
        setShownPages(prev => new Set(prev).add(step - 1));
      }}
      onFinalStepCompleted={() => {
        setShownPages(prev => new Set(prev).add(page.length));
        if (onAllStepsCompleted) onAllStepsCompleted();
      }}
      backButtonText="<"
      nextButtonText=">"
      stepCircleContainerClassName="bg-white/20 "
      disableStepIndicators
    >
      <Step>
        <div className="text-center">
          {shownPages.has(1) ?(
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
          {shownPages.has(2) ?(
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
          {shownPages.has(3)?(
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
          {shownPages.has(4) ?(
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
      onFinalStepCompleted={() => {
        setShownPages(prev => new Set(prev).add(page.length));
        if (onAllStepsCompleted) onAllStepsCompleted();
      }}
      backButtonText="<"
      nextButtonText=">"
      stepCircleContainerClassName="bg-[#F8B83A]/60"
      circlesColor="#a8540f"
      disableStepIndicators
    >
      <Step>
        <div className="text-sm">
          {shownPages.has(1)?(
            <p className=" tracking-wide break-words  mb-2 text-left">
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
          {shownPages.has(2) ?(
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
          {shownPages.has(3) ?(
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
          {shownPages.has(4) ?(
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
          {shownPages.has(4) ?(
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

export const LagoonTextBox: FC<{ className?: string; onAllStepsCompleted?: () => void; updateStep?: (step: number) => void}> = ({ onAllStepsCompleted, updateStep}) => {
  const { lagoonMap: dictionary } = useDictionary();
  const page = [dictionary.p0, dictionary.p1, dictionary.p2, dictionary.p3];
  const [shownPages, setShownPages] = useState(new Set<number>());

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        if (updateStep) {
          updateStep(step);
        }
        setShownPages(prev => new Set(prev).add(step - 1));
      }}
      onFinalStepCompleted={() => {
        setShownPages(prev => new Set(prev).add(page.length));
        if (onAllStepsCompleted) onAllStepsCompleted();
      }}
      backButtonText="<"
      nextButtonText=">"
      stepCircleContainerClassName="bg-[#F2E7DA]/70"
      circlesColor="#2293bf"
      disableStepIndicators
    >
      <Step>
        <div className="text-md">
          {shownPages.has(1) ?(
            <p className=" tracking-wide break-words  mb-2 text-left">
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
        <div className="text-md">
          {shownPages.has(2) ?(
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
        <div className="text-md">
          {shownPages.has(3) ?(
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
        <div className="text-md">
          {shownPages.has(4) ?(
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
    </Stepper>
  );
};

