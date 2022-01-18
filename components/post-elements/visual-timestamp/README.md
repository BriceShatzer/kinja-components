# VisualTimestamp ![ready](status-images/ready.svg) ![new](status-images/new.svg)

Displays a "visual" timestamp for general use. Can be used to display both relative and full time value, including "live" status.

[Demo](http://localhost:8001/?selectedKind=3.%20Elements%7CPost%20Elements%2FTimestamp)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| isLive | `boolean` | - | `false` | Display animated Live icon
| isSpliced | `boolean` | - | `false` | Is post object spliced
| isSponsored | `boolean` | - | `false` | Is post object sponsored/promoted/branded
| locale | `Locale` | - | `en-US` | Country and language code
| recircGroup | `RecircGroup` | - | - | Recirc group
| timestamp | `string` | - | - | Timestamp in milliseconds
| timestampFormat | `TimestampFormat` | - | - | relative, time, date

## Example

```jsx
<VisualTimestamp
  locale={select('locale', ['en-US', 'es-ES', 'hu-HU'], 'en-US')}
  isLive={boolean('isLive', false)}
  isSpliced={boolean('isSpliced', false)}
  isSponsored={boolean('isSponsored', false)}
  recircGroup={recircGroup()}
  timestamp={text('timestamp', '1549659600060')}
  timestampFormat={select('timestampFormat', ['relative', 'time', 'date'], 'time')}
/>
```

The above will render:

```html
<div class="visual-timestamp__Container-sc-10nwda0-0 gwGnUB">
  <svg name="clock" class="icon__IconSVG-sc-1rlybe8-0 fRnxYa">
    <use xlink:href="#iconset-clock"></use>
  </svg>
  <div class="visual-timestamp__Label-sc-10nwda0-1 eDcKFe">04:00 PM</div>
</div>
```
