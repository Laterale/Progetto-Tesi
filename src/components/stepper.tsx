import React, { useState, Children, useRef, useLayoutEffect, HTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  circlesColor?: string;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => ReactNode;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  circlesColor = '#94C11F',
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(currentStep + 1)
  };

  return (
    <div
      className="flex min-h-full flex-col sm:aspect-[4/3] md:aspect-[2/1]"
      {...rest}
    >
      <div
        className={`mx-auto w-full max-w-md rounded-3xl ${stepCircleContainerClassName}`}
        style={{ border: '2px solid black' }}
      >
        <div className={`${stepContainerClassName} flex w-full items-center p-5`}>
            {stepsArray.map((_, index) => {
              const stepNumber = index + 1;
              const isNotLastStep = index < totalSteps - 1;
              return (
                <React.Fragment key={stepNumber}>
                  {renderStepIndicator ? (
                    renderStepIndicator({
                      step: stepNumber,
                      currentStep,
                      onStepClick: clicked => {
                        setDirection(clicked > currentStep ? 1 : -1);
                        updateStep(clicked);
                      }
                    })
                  ) : (
                    <StepIndicator
                      step={stepNumber}
                      circlesColor={circlesColor}
                      disableStepIndicators={disableStepIndicators}
                      currentStep={currentStep}
                      onClickStep={clicked => {
                        setDirection(clicked > currentStep ? 1 : -1);
                        updateStep(clicked);
                      } } />
                  )}
                  {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
                </React.Fragment>
              );
            })}
          </div>
          <StepContentWrapper
            isCompleted={isCompleted}
            currentStep={currentStep}
            direction={direction}
            className={`space-y-2 px-8 ${contentClassName}`}
          >
            {stepsArray[currentStep - 1]}
          </StepContentWrapper>
          <div className={`px-5 pb-3 ${footerClassName}`}> 
            <div className={`flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}> 
              {currentStep !== 1 && (
                <button
                onClick={handleBack}
                className={"flex items-center justify-center rounded-full bg-transparent py-1.5 px-3.5 font-medium tracking-tight text-black transition"}
                {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              {!isCompleted ?
              <button
              onClick={isLastStep ? handleComplete : handleNext}
              className={`duration-350 flex items-center justify-center rounded-full py-1.5 px-3.5 font-medium text-black transition ${isLastStep ? 'animate-bounce' : ''}`}
              style={{backgroundColor: isLastStep ? circlesColor : 'transparent',}}
              >
                {">"}
              </button>
              :
              <span></span>
              }  
            </div>
          </div>
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = ''
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: parentHeight }}
      transition={{ type: 'spring', duration: 1 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {isCompleted ?        
        <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
          <div className="flex justify-center items-center">
            <img className="size-20" src="/assets/MascotteIcon.png" alt=""/>
          </div>
        </SlideTransition>
        :
        <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
          {children}
        </SlideTransition>
        }
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Imposta l’altezza iniziale
    onHeightReady(el.offsetHeight);

    // Osserva i cambiamenti di dimensione
    const observer = new ResizeObserver(() => {
      onHeightReady(el.offsetHeight);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: '0%',
    opacity: 1
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '+100%',
    opacity: 0
  })
};

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <div className="px-8">{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  circlesColor: string;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({ step, currentStep, circlesColor, onClickStep, disableStepIndicators = false }: StepIndicatorProps) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete'

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 0.3, backgroundColor: '#FFF'},
          active: { scale: 1, backgroundColor: circlesColor},
          complete: { scale: 1, backgroundColor: circlesColor}
        }}
        transition={{ duration: 0.3 }}
        className="flex h-5 w-5 items-center justify-center rounded-full font-semibold"
      >
        {status === 'complete' ? (
          <div className="h-2 w-2 rounded-full bg-white" />
        ) : status === 'active' ? (
          <div className="h-2 w-2 rounded-full bg-white" />
        ) : (
          <div className="h-1 w-1 rounded-full bg-white"></div>
        )}
      </motion.div>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: 'transparent' },
    complete: { width: '100%', height: '100%', backgroundColor: 'white' }
  };

  return (
    <div className="relative h-0.5 flex-1">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
}