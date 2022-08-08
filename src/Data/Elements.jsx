const nodes = [
  {
    id: "1",
    type: "source",
    data: {
      title: "Source",
      description: "Automations start Database with contacts.",
    },
    position: { x: 350, y: 0 },
  },
  {
    id: "2",
    type: "email",
    data: {
      title: "Email",
      description: "Send message to contacts.",
    },
    position: { x: 350, y: 150 },
  },
  {
    id: "3",
    type: "waitThenCheck",
    data: {
      title: "Wait then Check",
      description: "Check behaviour of the contacts.",
    },
    position: { x: 350, y: 300 },
  },
  {
    id: "4",
    type: "email",
    data: {
      title: "Email",
      description: "Send message to contacts.",
    },
    position: { x: 200, y: 500 },
  },
  {
    id: "5",
    type: "sms",
    data: {
      title: "SMS",
      description: "Send SMS to contacts.",
    },
    position: { x: 500, y: 500 },
  },
  {
    id: "6",
    type: "end",
    data: {
      title: "End",
      description: "Automation ends.",
      stats: {
        completed: 14,
      },
    },
    position: { x: 200, y: 650 },
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
    position: { x: 500, y: 650 },
  },
];

const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
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
    animated: true,
    data: {
      title: "Editable branch",
    },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    animated: true,
  },
];

export const initialElements = [...nodes, ...edges];
