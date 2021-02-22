const discord = require("discord.js");
const { config } = require("../../index.js");

module.exports.execute = async (client, message, args) => {

    const helpCommand = client.commands.get("help").help;
    const embed = new discord.MessageEmbed()
        .setThumbnail(client.user.avatarURL(client.user))
        .setFooter(`เรียกดูโดยไอ่เชี่ยนี่ ${message.author.tag}`)
        .setTimestamp();

    if (!args[0]) {

        const categories = [...new Set(client.commands.map(command => command.help.category))];

        embed.setTitle(`${client.user.tag} | คำสั่งทั้งหมดเลือกใช้ตามสบาย`);
        embed.setDescription([
            `**เครื่องหมายเริ่มต้นคำสั่ง:** \`${config.prefix}\``,
            `<> : จำเป็น | [] : ไม่จำเป็น`,
            `ใช้ \`${config.prefix}${helpCommand.name} ${helpCommand.usage}\` เพื่อดูรายละเอียดของคำสั่งแต่ละคำสั่งอีกที.`
        ].join("\n"));

        let categorisedCommands;

        for (const category of categories) {
            categorisedCommands = client.commands.filter(cmd => cmd.help.category == category);
            embed.addField(category, categorisedCommands.map(cmd => `\`${cmd.help.name}\``).join(", "));
        }

        message.channel.send(embed);
        return;
    }

    const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
    if (!command) return this.execute(client, message, []);

    const commandInfo = command.help;
    const aliasesPresent = commandInfo.aliases.length > 0;

    embed.setTitle(`${commandInfo.name.toUpperCase()} คำสั่ง`);
    embed.setDescription(commandInfo.description);
    embed.addField("วิธีใช้", `\`${config.prefix}${commandInfo.name}${commandInfo.usage != "" ? ` ${commandInfo.usage}` : ""}\``);
    embed.addField("ตัวย่อไม่มีหรอก", `${aliasesPresent ? commandInfo.aliases.map(alias => `\`${alias}\``).join(", ") : "\`ไม่มี\`"}`);

    message.channel.send(embed);

}

module.exports.help = {
    name: "help",
    aliases: [],
    category: "อื่นๆ",
    usage: "[คำสั่ง]",
    description: "เรียกดูรายละเอียดคำสั่งอื่นๆ"
}
