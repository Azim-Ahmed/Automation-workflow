const position = { x: 0, y: 0 };

const nodes = [
  {
    id: "1",
    type: "source",
    data: {
      title: "Source",
      description: "Automations Database contacts",
      stats: {
        started: 0,
      },
    },
    position,
    style: {
      width: 250,
    },
  },
  {
    id: "2",
    type: "email",
    data: {
      title: "Email",
      description: "Send message to contacts.",
      stats: {
        running: 18,
        error: 1,
      },
    },
    position,
  },
  {
    id: "3",
    type: "waitThenCheck",
    data: {
      title: "Wait then Check",
      description: "Check behaviour of the contacts.",
      stats: {
        running: 17,
      },
    },
    position,
    style: {
      width: 250,
    },
  },
  {
    id: "4",
    type: "email",
    data: {
      title: "Email",
      description: "Send message to contacts.",
      stats: {
        running: 3,
      },
    },
    position,
  },
  {
    id: "5",
    type: "sms",
    data: {
      title: "SMS",
      description: "Send SMS to contacts.",
      stats: {
        running: 14,
      },
    },
    position,
  },
  {
    id: "6",
    type: "empty",
    data: {},
    position,
    height: 6,
    mergeNodeOfParentId: "3",
  },
  {
    id: "7",
    type: "end",
    data: {
      title: "End",
      description: "Automation ends.",
      stats: {
        completed: 14,
      },
    },
    position,
  },
];

const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "condition",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "condition",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "condition",
    data: {
      title: "Default condition",
      disabled: true,
    },
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    type: "condition",
    data: {
      title: "Editable branch",
    },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    type: "condition",
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "condition",
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    type: "condition",
  },
];

export const initialElements = [...nodes, ...edges];
