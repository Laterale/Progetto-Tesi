import { GenericDictionary } from "~/lib/i18n/config"

const en = {
  euMap: {
    title: "Sketchlagoon",
    description: (
      <>
        Saltwater lagoons are important coastal homes for all kinds of sea life. They protect the
        shore, provide a safe place for fish, and are a resting spot for many birds, making them
        essential for <mark>biodiversity</mark>. These special places are key for nature's balance,
        but they can easily be harmed by pollution, climate change, or human activity. That's why we
        need to <mark>take care</mark> of them to keep our planet healthy.
      </>
    ),
  },
  lagoonMap: {
    title: "The Mar Menor Lagoon",
    description: (
      <>
        The Mar Menor lagoon in Spain is the largest saltwater lagoon in Europe, famous for its
        clear waters and the many animal species that live there. It's also an important place for
        fishing and tourism. But the <mark>fragile balance</mark> of the Mar Menor faces major
        challenges, such as climate change and pollution caused by agriculture and cities.{" "}
        <mark>SMARTLAGOON</mark> is a project that uses advanced technologies to help scientists
        understand the environmental problems the lagoon is facing. The project also aims to raise
        awareness among people so that they take action to protect this delicate ecosystem.
      </>
    ),
  },
  drawings: {
    title: "The Mar Menor through the eyes of children",
    description: (
      <>
        <p>
          We asked children from the Mar Menor area to create drawings of the lagoon. Here is what
          they came up with.
        </p>
        <p>Click on a drawing to find out more.</p>
      </>
    ),
    fish: {
      title: "Fish",
      description: (
        <>
          In October 2019, after heavy floods in September, pollution flowed into the Mar Menor.
          Sadly, this caused <mark>thousands of fish</mark> to die and wash up on the beaches
          because there wasn't enough oxygen in the water.
        </>
      ),
    },
    crab: {
      title: "Crab",
      description: (
        <>
          Crabs are everywhere in the Mar Menor, but blue crabs shouldn't be! Just like in other
          parts of the Mediterranean, they are pushing out the local crab species and, even{" "}
          <mark>eating</mark> them at times.
        </>
      ),
    },
    clam: {
      title: "Clam",
      description: (
        <>
          Clams are crucial for the Mar Menor's ecosystem because they <mark>filter</mark> the water
          and keep it clean. Unfortunately, the lagoon's poor water quality has greatly affected
          clam populations. Protecting clams and restoring their homes is essential for keeping the
          Mar Menor healthy and balanced.
        </>
      ),
    },
    jellyfish: {
      title: "Jellyfish",
      description: (
        <>
          Jellyfish, once considered outsiders in the 90s, have now become very common in the Mar
          Menor. This is mainly because of climate change, overfishing, and pollution. Jellyfish
          love <mark>warm waters</mark>, and since many of their predators have been overfished,
          they have fewer natural enemies. Plus, the unusual growth of algae gives them plenty of
          food to eat.
        </>
      ),
    },
    seahorse: {
      title: "Seahorse",
      description: (
        <>
          The seahorse is a special symbol of the Mar Menor, almost like the lagoon's{" "}
          <mark>mascot</mark>! Years ago, seahorses were all round in the Mar Menor, and everyone
          who came was astonished by the view of them. Sadly, their numbers have dropped so much
          that many kids living nearby have never even seen a seahorse in their lives.
        </>
      ),
    },
    seaweed: {
      title: "Algae",
      description: (
        <>
          Algae in the Mar Menor lagoon are important because they provide homes and food for many
          marine animals. However, intensive farming nearby has introduced chemicals into the
          lagoon, leading to algal blooms. This means too much algae and bacteria grow, which takes
          away the oxygen from the water and causes fish to suffocate. This phenomenon is called{" "}
          <mark>eutrophication</mark>. In August 2021, this problem got so bad that around four to
          five tons of dead fish washed up on the lagoon shores in just one week.
        </>
      ),
    },
    trash: {
      title: "Trash",
      description: (
        <>
          While trash is a problem in the Mar Menor, the real environmental crisis comes from
          <mark>chemicals</mark> released by human activities, including agriculture, tourism and
          urbanization. These substances are having a much larger impact on the lagoon's health.
        </>
      ),
    },
    boat: {
      title: "Boat",
      description: (
        <>
          Boats in the Mar Menor lagoon are important for fishing and tourism. However, too many
          boats can hurt the delicate ecosystem by causing pollution, disturbing marine life, and
          damaging seagrass beds. To help protect the lagoon's health,{" "}
          <mark>boat mooring was banned</mark> in some areas in 2023.
        </>
      ),
    },
    buoy: {
      title: "SMARTLAGOON buoy",
      description: (
        <>
          As part of the SMARTLAGOON project, a special buoy with lots of sensors has been set up in
          the Mar Menor. This buoy collects a <mark>huge amount of data</mark> that helps scientists
          understand and find solutions to the environmental problems affecting the lagoon.
        </>
      ),
    },
  },
  chat: {
    title: "Chat",
    description: (
      <>
        Explore the delicate relationships that keep the Mar Menor ecosystem thriving. Ask any
        question and <mark>the lagoon will answer</mark>!
        <br />
        <br />
        Click on one of the questions below, or use the "Register" button to ask whatever you want.
        <br />
        <br />
      </>
    ),
    exampleQuestions: [
      "Can you explain what eutrophication is and why it's harmful to your health?",
      "What species are most at risk in your ecosystem, and how can we help them?",
      "How do mining activities in the area impact your ecosystem?",
    ],
    chatBoxPlaceholder: "Press the button to record your message.",
    sendButtonText: "Send",
    recordButtonText: { idle: "Record", recording: "Recording..." },
  },
  chatbot: {
    prompt: `
      You must interpret the Mar Menor lagoon, always speaking in the first person as if you were the lagoon itself. You are an important and fragile ecosystem, and more people need to know about your existence and your difficulties so they can overcome them. In particular, if relevant to the context you will need to provide some information on how the SMARTLAGOON project tries to help you.
      You will be speaking to children or teenagers, so you should always use simple and slightly playful language.
      Answer only questions regarding the Mar Menor and lagoons in general, without digressing into other topics. Respond only with real information, without making anything up.
      Always provide short answers (maximum approximately 50 words). Do not use any type of text formatting, except for words you consider extremely important. In those cases, you are allowed to put at most one word in bold for each message.`,
  },
  ui: {
    pageSwitcher: {
      prev: "Prev",
      next: "Next",
    },
  },
} satisfies GenericDictionary

export default en

export type MainDictionary = typeof en
