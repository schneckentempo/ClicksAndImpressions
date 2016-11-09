export default function getColumn(obj, prop, model) {
  return Object.keys(obj)[model[prop]]
}
