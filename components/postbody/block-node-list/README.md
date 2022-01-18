# BlockNodeList

This component takes a list of BlockNode instances and matches each one with its corresponding component, rendering the whole list. It is important to note that some block nodes (namely Paragraph, Header and HorizontalRule) do have containers defined on them, which need to be consolidated into a single wrapper over components that share them. Because of this you always never want to render block nodes individually, but through the BlockNodeList component.

<!-- STORY -->

## Props

### nodes

Type: _Array<BlockNode>_
